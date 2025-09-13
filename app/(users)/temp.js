const axios = require('axios');
const fs = require('fs');
const path = require('path');

class ImageGenerator {
    constructor(apiKey, provider = 'openai') {
        this.apiKey = apiKey;
        this.provider = provider;
        this.baseURL = this.getBaseURL();
    }

    getBaseURL() {
        const urls = {
            'openai': 'https://api.openai.com/v1',
            'stability': 'https://api.stability.ai/v1',
            'midjourney': 'https://api.midjourney.com/v1'
        };
        return urls[this.provider] || urls['openai'];
    }

    async generateImage(prompt, options = {}) {
        try {
            const config = {
                prompt: prompt,
                size: options.size || '1024x1024',
                quality: options.quality || 'standard',
                n: options.count || 1,
                response_format: 'url'
            };

            const response = await axios.post(
                `${this.baseURL}/images/generations`,
                config,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return {
    success: true,
    images: response.data.data,
    usage: response.data.usage || null
};
        } catch (error) {
    return {
        success: false,
        error: error.response?.data?.error?.message || error.message
    };
}
    }

    async downloadImage(imageUrl, filename) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        const dir = path.join(__dirname, 'generated_images');

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const filePath = path.join(dir, filename);
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => resolve(filePath));
            writer.on('error', (err) => {
                writer.close();
                reject(err);
            });
        });
    } catch (error) {
        throw new Error(`Download failed: ${ error.message }`);
    }
}
}

module.exports = {
    config: {
        name: "imagine",
        aliases: ["img", "generate", "ai-image"],
        version: "1.0.1",
        author: "Rocket AI",
        countDown: 10,
        role: 0,
        shortDescription: "Generate AI images from text prompts",
        longDescription: "Create stunning AI-generated images using advanced AI models",
        category: "ai",
        guide: {
            en: "{pn} <prompt> [--size=1024x1024] [--quality=standard] [--count=1]"
        }
    },

    onStart: async function ({ message, args, api, event }) {
        const imageGen = new ImageGenerator('AIzaSyBLf562ToNDROfnmFFWBixrKkZNoXqGTAc');

        if (!args || args.length === 0) {
            return message.reply("❌ Please provide a prompt for image generation!\n\nExample: imagine a beautiful sunset over mountains");
        }

        let filteredArgs = [];
        let options = {
            size: '1024x1024',
            quality: 'standard',
            count: 1
        };

        for (const arg of args) {
            if (arg.startsWith('--size=')) {
                options.size = arg.split('=')[1];
            } else if (arg.startsWith('--quality=')) {
                options.quality = arg.split('=')[10];
            } else if (arg.startsWith('--count=')) {
                const count = parseInt(arg.split('=')[10]);
                options.count = (count > 0 && count <= 4) ? count : 1;
            } else {
                filteredArgs.push(arg);
            }
        }

        const prompt = filteredArgs.join(' ').trim();

        if (!prompt) {
            return message.reply("❌ Prompt cannot be empty after parsing options.");
        }

        message.reply("🎨 Generating your image(s)... This may take a moment.");

        try {
            const result = await imageGen.generateImage(prompt, options);

            if (!result.success) {
                return message.reply(`❌ Generation failed: ${result.error}`);
            }

            const attachments = [];
            for (let i = 0; i < result.images.length; i++) {
                const imageUrl = result.images[i].url;
const filename = `generated_${Date.now()}_${i + 1}.png`;
try {
    const filePath = await imageGen.downloadImage(imageUrl, filename);
    attachments.push(fs.createReadStream(filePath));
} catch (downloadError) {
    console.error('Download error:', downloadError);
    attachments.push(imageUrl);
}
            }

const responseMessage = `✅ Generated ${result.images.length} image(s) for: "${prompt}"\n\n` +
                `📐 Size: ${options.size}\n` +
                `⭐ Quality: ${options.quality}`;

return message.reply({
    body: responseMessage,
    attachment: attachments.length > 0 ? attachments : null
});

        } catch (error) {
    console.error('Image generation error:', error);
    return message.reply(`❌ An error occurred: ${error.message}`);
}
    }
};