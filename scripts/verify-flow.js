const BASE_URL = 'http://localhost:3000';

async function runVerification() {
  console.log('🚀 Starting Final Verification (Extended)...');

  // 1. Seed Database
  console.log('\n🌱 Seeding Database...');
  try {
    const seedRes = await fetch(`${BASE_URL}/api/admin/seed`, {
      method: 'POST',
    });
    if (!seedRes.ok) throw new Error(`Seed failed: ${seedRes.statusText}`);
    console.log('✅ Database seeded');
  } catch (e) {
    console.error('❌ Seed failed:', e.message);
  }

  // 2. Signup User
  const email = `testuser_${Date.now()}@example.com`;
  const password = 'password123';
  const officeId = 'std-1'; // Ballygunge
  console.log(`\n👤 Creating User: ${email}`);

  let userId;
  try {
    const signupRes = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email,
        password,
        office: officeId,
      }),
    });

    if (!signupRes.ok) {
      const err = await signupRes.json();
      throw new Error(err.error || signupRes.statusText);
    }
    const userData = await signupRes.json();
    userId = userData.user.id;
    console.log('✅ User created:', userId);
  } catch (e) {
    console.error('❌ Signup failed:', e.message);
  }

  // 3. Verify API Routes Existence (Public & Protected)
  const routesToCheck = [
    // Core
    { name: 'Metrics API', url: `${BASE_URL}/api/metrics`, method: 'GET' },
    { name: 'DRM API', url: `${BASE_URL}/api/drm`, method: 'GET' },
    {
      name: 'Reports API',
      url: `${BASE_URL}/api/reports/daily`,
      method: 'GET',
    },

    // Admin Features
    {
      name: 'Admin Users API',
      url: `${BASE_URL}/api/admin/users`,
      method: 'GET',
    },
    {
      name: 'Admin Offices API',
      url: `${BASE_URL}/api/admin/offices`,
      method: 'GET',
    },
    {
      name: 'Monthly Reports API',
      url: `${BASE_URL}/api/reports/monthly`,
      method: 'GET',
    },

    // Extended Features
    {
      name: 'Targets API',
      url: `${BASE_URL}/api/admin/targets`,
      method: 'GET',
    },
    {
      name: 'Unlock Requests API',
      url: `${BASE_URL}/api/admin/unlock-requests`,
      method: 'GET',
    },
    {
      name: 'Audit Logs API',
      url: `${BASE_URL}/api/admin/audit-logs`,
      method: 'GET',
    },
  ];

  console.log('\n🔍 Verifying API Routes Existence...');
  for (const route of routesToCheck) {
    try {
      const res = await fetch(route.url, { method: route.method });
      if (res.status === 404) {
        console.error(`❌ ${route.name} NOT FOUND (404)`);
      } else {
        console.log(`✅ ${route.name}: Reachable (Status: ${res.status})`);
      }
    } catch (e) {
      console.error(`❌ ${route.name} Error:`, e.message);
    }
  }

  // 4. Verify DRM Approval & Export Routes
  const dummyId = '65f1a2b3c4d5e6f7g8h9i0j1'; // Dummy Mongo ID
  const drmRoutes = [
    {
      name: 'DRM Approve API',
      url: `${BASE_URL}/api/drm/${dummyId}/approve`,
      method: 'POST',
    },
    {
      name: 'DRM Reject API',
      url: `${BASE_URL}/api/drm/${dummyId}/reject`,
      method: 'POST',
    },
    {
      name: 'DRM Export API',
      url: `${BASE_URL}/api/drm/${dummyId}/export`,
      method: 'GET',
    },
  ];

  for (const route of drmRoutes) {
    try {
      const res = await fetch(route.url, { method: route.method });
      if (res.status === 404) {
        console.error(`❌ ${route.name} NOT FOUND (404)`);
      } else {
        console.log(`✅ ${route.name}: Reachable (Status: ${res.status})`);
      }
    } catch (e) {
      console.error(`❌ ${route.name} Error:`, e.message);
    }
  }

  // 5. Verify Unlock Request Actions
  const unlockRoutes = [
    {
      name: 'Unlock Approve API',
      url: `${BASE_URL}/api/admin/unlock-requests/${dummyId}/approve`,
      method: 'POST',
    },
    {
      name: 'Unlock Reject API',
      url: `${BASE_URL}/api/admin/unlock-requests/${dummyId}/reject`,
      method: 'POST',
    },
  ];

  for (const route of unlockRoutes) {
    try {
      const res = await fetch(route.url, { method: route.method });
      if (res.status === 404) {
        console.error(`❌ ${route.name} NOT FOUND (404)`);
      } else {
        console.log(`✅ ${route.name}: Reachable (Status: ${res.status})`);
      }
    } catch (e) {
      console.error(`❌ ${route.name} Error:`, e.message);
    }
  }

  console.log('\n🎉 Verification Complete');
}

runVerification();
