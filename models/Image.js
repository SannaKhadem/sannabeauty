// models/Image.js

const mongoose = require("mongoose");

// Define the schema for uploaded images
const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  description: { type: String }, // legacy free text
  // New structured fields for before/after pairing
  treatment: { type: String, index: true }, // e.g. 'botox', 'filler'
  phase: { type: String, enum: ['före', 'efter'], index: true },
  group: { type: Number, index: true }, // numeric pairing id
  uploadedAt: { type: Date, default: Date.now },
});

// Backward compatibility virtual: if treatment not set, attempt parse from description
imageSchema.virtual('parsed').get(function () {
  if (this.treatment && this.phase) return null; // structured exists
  if (!this.description) return null;
  const patterns = [
    /(botox|filler|skinbooster|ansiktsbehandling)\s+(före|efter)\s*(\d+)/i,
  ];
  for (const p of patterns) {
    const m = this.description.match(p);
    if (m) {
      return {
        treatment: m[1].toLowerCase(),
        phase: m[2].toLowerCase(),
        group: parseInt(m[3], 10) || undefined,
      };
    }
  }
  return null;
});

// Export the model
module.exports = mongoose.model("Image", imageSchema);
