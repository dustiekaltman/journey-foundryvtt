/**
 * Character class for the game system
 */
export class AstroInfernoCharacter extends Actor {
    /** @override */
    prepareData() {
        super.prepareData();
        const actorData = this.system;
        
        // Calculate derived attributes
        this._prepareAttributes(actorData);
        this._prepareForms(actorData);
        this._prepareDestinies(actorData);
    }

    /**
     * Prepare character attributes
     * @private
     */
    _prepareAttributes(actorData) {
        const attributes = actorData.attributes;
        
        // Basic attributes
        attributes.strength = attributes.strength || 10;
        attributes.dexterity = attributes.dexterity || 10;
        attributes.constitution = attributes.constitution || 10;
        attributes.intelligence = attributes.intelligence || 10;
        attributes.wisdom = attributes.wisdom || 10;
        attributes.charisma = attributes.charisma || 10;

        // Story Points
        attributes.storyPoints = attributes.storyPoints || 0;
        attributes.maxStoryPoints = attributes.maxStoryPoints || 3;
    }

    /**
     * Prepare Forms (Races)
     * @private
     */
    _prepareForms(actorData) {
        const forms = actorData.forms || [];
        actorData.forms = forms.map(form => {
            // Apply form bonuses and abilities
            return form;
        });
    }

    /**
     * Prepare Destinies (Classes)
     * @private
     */
    _prepareDestinies(actorData) {
        const destinies = actorData.destinies || [];
        actorData.destinies = destinies.map(destiny => {
            // Apply destiny features and abilities
            return destiny;
        });
    }

    /**
     * Roll a D20 check
     * @param {string} attribute - The attribute to use for the check
     * @param {number} modifier - Additional modifier to the roll
     * @returns {Promise<Roll>} The roll result
     */
    async rollCheck(attribute, modifier = 0) {
        const roll = new Roll("1d20");
        await roll.evaluate({async: true});
        
        // Check for story point generation (e.g., on natural 20)
        if (roll.total === 20) {
            await this.addStoryPoint();
        }
        
        return roll;
    }

    /**
     * Add a story point to the character
     * @returns {Promise<void>}
     */
    async addStoryPoint() {
        const currentSP = this.system.attributes.storyPoints;
        const maxSP = this.system.attributes.maxStoryPoints;
        
        if (currentSP < maxSP) {
            await this.update({
                "system.attributes.storyPoints": currentSP + 1
            });
        }
    }

    /**
     * Spend a story point
     * @returns {Promise<boolean>} Whether the point was spent successfully
     */
    async spendStoryPoint() {
        const currentSP = this.system.attributes.storyPoints;
        
        if (currentSP > 0) {
            await this.update({
                "system.attributes.storyPoints": currentSP - 1
            });
            return true;
        }
        return false;
    }
} 