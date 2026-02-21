/**
 * Script pour tester directement l'API de login
 * Usage: npx tsx scripts/test-login-api.ts
 */

import fetch from 'node-fetch';

async function testLogin() {
  console.log(`🔍 Test de l'API de login...
`);

  const testCases = [
    { login: 'Admin', password: 'Password', description: 'Login correct (Admin/Password)' },
    { login: 'admin', password: 'Password', description: 'Login en minuscules' },
    { login: 'Admin', password: 'password', description: 'Password en minuscules' },
    { login: 'Admin ', password: 'Password', description: 'Login avec espace à la fin' },
    { login: 'Admin', password: 'Password ', description: 'Password avec espace à la fin' },
  ];

  for (const testCase of testCases) {
    console.log(`
📝 Test: ${testCase.description}`);
    console.log(`   Login: "${testCase.login}" (length: ${testCase.login.length})`);
    console.log(`   Password: "${testCase.password}" (length: ${testCase.password.length})`);

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: testCase.login,
          password: testCase.password,
        }),
      });

      const data: any = await response.json();
      
      console.log(`   Status: ${response.status}`);
      console.log(`   Response:`, JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log(`   ✅ Connexion réussie !`);
      } else {
        console.log(`   ❌ Échec: ${data.error || 'Erreur inconnue'}`);
      }
    } catch (error: any) {
      console.log(`   ❌ Erreur de connexion: ${error.message}`);
      console.log(`   💡 Assurez-vous que le serveur est démarré (npm run dev)`);
    }
  }
}

testLogin().catch(console.error);
