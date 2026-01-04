/**
 * Configuration PM2 pour le déploiement en production
 * 
 * Installation : npm install -g pm2
 * Utilisation : pm2 start ecosystem.config.js
 * 
 * Commandes utiles :
 * - pm2 status : Voir le statut des processus
 * - pm2 logs abcliv-agency : Voir les logs
 * - pm2 restart abcliv-agency : Redémarrer l'application
 * - pm2 stop abcliv-agency : Arrêter l'application
 * - pm2 save : Sauvegarder la configuration
 * - pm2 startup : Configurer le démarrage automatique au boot
 */

module.exports = {
  apps: [{
    name: 'abcliv-agency',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    cwd: process.cwd(),
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000
  }]
}

