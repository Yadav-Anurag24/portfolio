/**
 * Seed script — replaces all projects in MongoDB with the latest data from projects.js
 *
 * Usage:  node seedProjects.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/projectModel');
const projects = require('./data/projects');

dotenv.config();

const seedProjects = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI not found in .env — cannot seed.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Remove all existing projects
    const deleted = await Project.deleteMany({});
    console.log(`🗑️  Removed ${deleted.deletedCount} old project(s)`);

    // Insert updated projects
    const inserted = await Project.insertMany(projects);
    console.log(`✅ Inserted ${inserted.length} project(s):`);
    inserted.forEach((p) => console.log(`   • [${p.id}] ${p.name}`));

    console.log('\n🎉 Done! Restart your server to see the changes.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedProjects();
