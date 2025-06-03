export class FormSheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["journey-foundryvtt", "sheet", "item", "form"],
            template: "systems/journey-foundryvtt/templates/items/form-sheet.html",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "attributes"}]
        });
    }

    getData() {
        const context = super.getData();
        
        // Get the Item's data
        const itemData = this.item.toObject(false);
        
        // Add the Item's data to context.data for easier access
        context.system = itemData.system;
        context.flags = itemData.flags;
        
        // Prepare form type specific data
        if (context.system.abilities) {
            context.abilities = context.system.abilities;
        }
        
        // Add roll data
        context.rollData = this.item.getRollData();
        
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);
        
        if (!this.isEditable) return;
        
        // Roll handlers
        html.find('.rollable').click(this._onRoll.bind(this));
        
        // Add ability
        html.find('.ability-create').click(this._onAbilityCreate.bind(this));
        
        // Delete ability
        html.find('.ability-delete').click(this._onAbilityDelete.bind(this));
    }

    async _onRoll(event) {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;
        
        if (dataset.roll) {
            let label = dataset.label ? `Rolling ${dataset.label}` : '';
            let roll = new Roll(dataset.roll, this.item.getRollData());
            await roll.evaluate();
            roll.toMessage({
                speaker: ChatMessage.getSpeaker({ actor: this.item.actor }),
                flavor: label,
                rollMode: game.settings.get('core', 'rollMode'),
            });
            return roll;
        }
    }

    async _onAbilityCreate(event) {
        event.preventDefault();
        const abilities = this.item.system.abilities || {};
        const newKey = `ability${Object.keys(abilities).length + 1}`;
        abilities[newKey] = {
            name: "New Ability",
            description: "",
            formula: "1d20"
        };
        await this.item.update({"system.abilities": abilities});
    }

    async _onAbilityDelete(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".ability");
        const abilityKey = li.data("ability");
        const abilities = duplicate(this.item.system.abilities || {});
        delete abilities[abilityKey];
        await this.item.update({"system.abilities": abilities});
    }
}