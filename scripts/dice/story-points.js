/**
 * Story Points system for the game
 */
export class StoryPoints {
    /**
     * Initialize the story points system
     */
    static init() {
        // Register the story point chat message type
        CONFIG.ChatMessage.documentClass.registerMessageType('storyPoint');
    }

    /**
     * Create a story point message
     * @param {Actor} actor - The actor who gained the story point
     * @returns {Promise<ChatMessage>}
     */
    static async createStoryPointMessage(actor) {
        const content = await renderTemplate('templates/chat/story-point.html', {
            actor: actor,
            storyPoints: actor.system.attributes.storyPoints,
            maxStoryPoints: actor.system.attributes.maxStoryPoints
        });

        return ChatMessage.create({
            speaker: ChatMessage.getSpeaker({ actor: actor }),
            content: content,
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            flavor: 'Story Point Gained!'
        });
    }

    /**
     * Handle spending a story point
     * @param {Actor} actor - The actor spending the point
     * @param {string} reason - The reason for spending the point
     * @returns {Promise<boolean>} Whether the point was spent successfully
     */
    static async spendStoryPoint(actor, reason) {
        if (await actor.spendStoryPoint()) {
            const content = await renderTemplate('templates/chat/story-point-spent.html', {
                actor: actor,
                reason: reason,
                storyPoints: actor.system.attributes.storyPoints
            });

            await ChatMessage.create({
                speaker: ChatMessage.getSpeaker({ actor: actor }),
                content: content,
                type: CONST.CHAT_MESSAGE_TYPES.OTHER,
                flavor: 'Story Point Spent'
            });

            return true;
        }
        return false;
    }
} 