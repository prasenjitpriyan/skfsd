import { hashPassword } from '../lib/auth.js';
import dbConnect from '../lib/mongodb.js';
import User from '../models/User.js';

const offices = [
  'Kolkata GPO',
  'Salt Lake City',
  'Park Street',
  'New Market',
  // Add remaining offices here up to 40+
];

const deliveryCenters = ['DC North', 'DC South', 'DC East', 'DC West'];

async function seedUsers() {
  await dbConnect();

  console.log('Seeding users...');

  // Helper function to create a user if not exists
  async function createUserIfNotExists(
    email,
    password,
    role,
    officeName = null
  ) {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await hashPassword(password);
      const userData = { email, password: hashedPassword, role };
      if (officeName) userData.officeName = officeName;
      await User.create(userData);
      console.log(`Created user: ${email}`);
    } else {
      console.log(`User already exists: ${email}`);
    }
  }

  // Create admin users
  for (let i = 1; i <= 3; i++) {
    await createUserIfNotExists(`admin${i}@skfsd.gov.in`, 'admin123', 'admin');
  }

  // Create office users
  for (let i = 0; i < offices.length; i++) {
    await createUserIfNotExists(
      `office${i + 1}@skfsd.gov.in`,
      'office123',
      'office',
      offices[i]
    );
  }

  // Create delivery center users
  for (let i = 0; i < deliveryCenters.length; i++) {
    await createUserIfNotExists(
      `delivery${i + 1}@skfsd.gov.in`,
      'delivery123',
      'delivery',
      deliveryCenters[i]
    );
  }

  console.log('Users seeded successfully');
  process.exit(0);
}

seedUsers().catch((err) => {
  console.error('Error seeding users:', err);
  process.exit(1);
});
