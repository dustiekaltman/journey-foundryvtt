/**
 * Destiny (Class) class for the game system
 */
export class AstroInfernoDestiny extends Item {
    /** @override */
    prepareData() {
        super.prepareData();
        const itemData = this.system;

        // Ensure destiny has required properties
        itemData.level = itemData.level || 1;
        itemData.features = itemData.features || [];
        itemData.proficiencies = itemData.proficiencies || {
            skills: [],
            tools: [],
            weapons: [],
            armor: []
        };
    }

    /**
     * Get the features available at the current level
     * @returns {Array} Array of features
     */
    getLevelFeatures() {
        return this.system.features.filter(f => f.level <= this.system.level);
    }

    /**
     * Get all proficiencies granted by this destiny
     * @returns {Object} Object containing proficiency lists
     */
    getProficiencies() {
        return this.system.proficiencies;
    }

    /**
     * Check if the destiny has a specific feature
     * @param {string} featureId - The ID of the feature to check
     * @returns {boolean} Whether the destiny has the feature
     */
    hasFeature(featureId) {
        return this.system.features.some(f => f.id === featureId);
    }
} 