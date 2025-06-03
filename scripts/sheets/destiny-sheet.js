export class DestinySheet extends ItemSheet {
    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["astro-inferno", "sheet", "item", "destiny"],
            template: "systems/astro-inferno/templates/items/destiny-sheet.html",
            width: 520,
            height: 480,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    getData() {
        const context = super.getData();
        
        // Get the Item's data
        const itemData = this.item.toObject(false);
        
        // Add the Item's data to context.data for easier access
        context.system = itemData.system;
        context.flags = itemData.flags;
        
        // Prepare destiny type specific data
        if (context.system.benefits) {
            context.benefits = context.system.benefits;
        }
        
        if (context.system.drawbacks) {
            context.drawbacks = context.system.drawbacks;
        }
        
        // Add roll data
        context.rollData = this.item.getRollData();
        
        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);
        
        if (!this.isEditable) return;
        
        // Add benefit
        html.find('.benefit-create').click(this._onBenefitCreate.bind(this));
        
        // Delete benefit
        html.find('.benefit-delete').click(this._onBenefitDelete.bind(this));
        
        // Add drawback
        html.find('.drawback-create').click(this._onDrawbackCreate.bind(this));
        
        // Delete drawback
        html.find('.drawback-delete').click(this._onDrawbackDelete.bind(this));
    }

    async _onBenefitCreate(event) {
        event.preventDefault();
        const benefits = this.item.system.benefits || [];
        benefits.push({
            name: "New Benefit",
            description: ""
        });
        await this.item.update({"system.benefits": benefits});
    }

    async _onBenefitDelete(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".benefit");
        const index = li.data("index");
        const benefits = duplicate(this.item.system.benefits || []);
        benefits.splice(index, 1);
        await this.item.update({"system.benefits": benefits});
    }

    async _onDrawbackCreate(event) {
        event.preventDefault();
        const drawbacks = this.item.system.drawbacks || [];
        drawbacks.push({
            name: "New Drawback",
            description: ""
        });
        await this.item.update({"system.drawbacks": drawbacks});
    }

    async _onDrawbackDelete(event) {
        event.preventDefault();
        const li = $(event.currentTarget).parents(".drawback");
        const index = li.data("index");
        const drawbacks = duplicate(this.item.system.drawbacks || []);
        drawbacks.splice(index, 1);
        await this.item.update({"system.drawbacks": drawbacks});
    }
}