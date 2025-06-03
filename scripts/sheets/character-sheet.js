export class CharacterSheet extends ActorSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["astro-inferno", "sheet", "actor", "character"],
            template: "systems/astro-inferno/templates/actor/character-sheet.html",
            width: 720,
            height: 680,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes"}],
            dragDrop: [{dragSelector: ".item-list .item", dropSelector: null}]
        });
    }

    getData() {
        const context = super.getData();
        
        // Prepare character data
        context.system = context.actor.system;
        context.flags = context.actor.flags;
        
        // Prepare items
        context.items = {
            forms: [],
            destinies: []
        };
        
        // Organize items
        for (let i of context.actor.items) {
            i.img = i.img || DEFAULT_TOKEN;
            if (i.type === 'form') {
                context.items.forms.push(i);
            } else if (i.type === 'destiny') {
                context.items.destinies.push(i);
            }
        }
        
        // Add roll data
        context.rollData = context.actor.getRollData();
        
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);
        
        // Everything below here is only needed if the sheet is editable
        if (!this.isEditable) return;
        
        // Add Inventory Item
        html.find('.item-create').click(this._onItemCreate.bind(this));
        
        // Update Inventory Item
        html.find('.item-edit').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.sheet.render(true);
        });
        
        // Delete Inventory Item
        html.find('.item-delete').click(ev => {
            const li = $(ev.currentTarget).parents(".item");
            const item = this.actor.items.get(li.data("itemId"));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });
        
        // Rollable abilities
        html.find('.rollable').click(this._onRoll.bind(this));
        
        // Story Points
        html.find('.spend-story-point').click(this._onSpendStoryPoint.bind(this));
        html.find('.gain-story-point').click(this._onGainStoryPoint.bind(this));
    }

    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type;
        const data = duplicate(header.dataset);
        const name = `New ${type.capitalize()}`;
        const itemData = {
            name: name,
            type: type,
            system: data
        };
        delete itemData.system["type"];
        
        return await Item.create(itemData, {parent: this.actor});
    }

    async _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        
        if (dataset.rollType) {
            if (dataset.rollType == 'item') {
                const itemId = element.closest('.item').dataset.itemId;
                const item = this.actor.items.get(itemId);
                if (item) return item.roll();
            }
        }
        
        if (dataset.roll) {
            let label = dataset.label ? `Rolling ${dataset.label}` : '';
            let roll = new Roll(dataset.roll, this.actor.getRollData());
            await roll.evaluate();
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.actor }),
                flavor: label,
                rollMode: game.settings.get('core', 'rollMode'),
            });
            return roll;
        }
    }

    async _onSpendStoryPoint(event) {
        event.preventDefault();
        const current = this.actor.system.storyPoints || 0;
        if (current > 0) {
            await this.actor.update({"system.storyPoints": current - 1});
            // Trigger story point spent message
            const StoryPoints = await import('../dice/story-points.js').then(m => m.StoryPoints);
            StoryPoints.spendPoint(this.actor);
        }
    }

    async _onGainStoryPoint(event) {
        event.preventDefault();
        const current = this.actor.system.storyPoints || 0;
        await this.actor.update({"system.storyPoints": current + 1});
    }
}