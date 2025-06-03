/**
 * Form (Race) class for the game system
 */
export class AstroInfernoForm extends Item {
    /** @override */
    prepareData() {
        super.prepareData();
        const itemData = this.system;

        // Ensure form has required properties
        itemData.attributes = itemData.attributes || {};
        itemData.abilities = itemData.abilities || [];
        itemData.traits = itemData.traits || [];
    }

    /**
     * Get the attribute bonuses from this form
     * @returns {Object} Object containing attribute bonuses
     */
    getAttributeBonuses() {
        return this.system.attributes || {};
    }

    /**
     * Get the abilities granted by this form
     * @returns {Array} Array of abilities
     */
    getAbilities() {
        return this.system.abilities || [];
    }

    /**
     * Get the traits granted by this form
     * @returns {Array} Array of traits
     */
    getTraits() {
        return this.system.traits || [];
    }
} 