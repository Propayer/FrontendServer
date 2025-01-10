//const admin = require('firebase-admin');

//// Configuración de las credenciales de Firebase directamente en el código
//const serviceAccount = {
//  "type": "service_account",
//  "project_id": "backend-database-44031",
//  "private_key_id": "a1fc82f49bfd4f5e42dc909384c4cf5d3a0a303b",
//  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzTUfOe1E2eikU\nwEca932QOUNV5GxxrL3JKyf60OHTgDuKnx/ihip3+d+6bGaW17E+k2zuqE/Jl52P\nCwSDiYXU6FxfTrMk/S3n7Doz7xnRT6RE4TLkARqqXW6JoIrb4mYDrT9jZ0wNJSkS\nFQkkYAnyviURvBMjqFx3zHWCICwwLT2eh0am2IgE7EkaBQZ05A7T7z89K+jFTq4I\nbfT9UbhvJ/R+pdVB57P0IQYFMw/lhkEXZMF0gqjWk9cNC5j0Nw9LbkaKmNWlgkcz\nptoP6JRoLegWqfPZMPPd1Ba21CMLZmdhwV2bRZUUIxvG+NUMx5tr89hh+i1yMBtH\nM5UVMnhxAgMBAAECggEACdlwHSwF4b1HjA7VJRqE6q8Tl2h6KsspfH9O9Zqjehje\nZHKx56GVPASVVTY60zTPZSun6WsEYYN/LaY2OfPMLs4yE0/1XC3+d2HRD2zmLRrf\n8CLzBsZ3AJZr8dpYYGRtFE0AOTmZmlQBD9/JEhcGut92NbWAM2ZuaGwKRTL3XHDL\nCbYuC6yszHvDlwcN+/muR/aXE/3gKTQmkOPAshzTBFmv4xRpKgmBYehEJq9avMEO\nq7yR75tqARohXzmJez2JAPHa9FG/KbCo1TqipYae/eytt11wMy1uYu5z3FVPf36T\nrV+g/rsDyHrilepiAOB/FO2cNoqOxzsK6B2SPy5LgQKBgQDzY7d++nAJluwwUZIV\naiUvz1+m872m3KI+FFZQyhQLkzUsbNlzuBDC1sYwIeuUvDY/262K8UspyUsIiBaF\nD3LqMsvR02tk3IRlNDB07Xcdn2PuSnG5XlsKFgmC82YHvTzZC2/Bl3OFPpCy4gF+\nq/Pppaq2BMFdLkajVjAqlkyUgQKBgQC8l4O5FqlpAokaQEo69oeeSwteGGmg/9Zy\n0lmrdD0FhnSRG/odLcspPo11BrtGle8i4yhpezbZL9xjYoY/SDLnRaX197DjcOLJ\nzmYfynvGD0lnTuwEKVNR33JhU3/3nPbrAp0w2DUQSJSGaQhkSvg0EixFd+QfBWxw\nTuFEMakr8QKBgHsXzoDotesTqkZRqtkrwrzoW077bMpMQb212WWonfSwsa7TKjLt\nP4TazIchUJz7h1BKkP15RXNPu6QH96O6CXtKz2xCSclMAaWRfIRWaOzRZN/qRJPk\nlZSHSq4w3URCv9hhgVbeeu1DlDj0Np9S5dwgDjNaOlUfB1iqSVfwhbCBAoGBAJYG\nlkQccgJWgQjAEg0b50EWg+GD3Cu2ujs3eRv66TxG/N4e+nZR4qdZ2qA5DawWRFll\nidV3rmdSOqlZTGB1KAFxF5g3RaF5QQC3T+iEZLhnmsYzM3AQC/c6oTwpd8hcNtU3\njCK6LGRayMSwM3vNY+vQdSWCPZgr8VradTuRofmRAoGBALgsIooOSZIDy7D7POud\nYRG4Axfvk3ZGXt0t7lWRfYc2du4v5QAHIfm+0e1MZ8lWELtnBipKZ3Csg9V8AtTY\nfxCQ5/5dbXsFuIBuQFkGJpTILu3bVM9bTj3F5zJqIYDFqjWusCT32qXOERkUjQhq\n+vI8MZTrV3ZOkVkViKN9pHS8\n-----END PRIVATE KEY-----\n",
//  "client_email": "firebase-adminsdk-nfaqx@backend-database-44031.iam.gserviceaccount.com",
//  "client_id": "104560485061901446017",
//  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//  "token_uri": "https://oauth2.googleapis.com/token",
//  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nfaqx%40backend-database-44031.iam.gserviceaccount.com",
//  "universe_domain": "googleapis.com"
//};

//// Inicializar Firebase con un nombre único si aún no se ha inicializado
//const appName = "myFirebaseApp"; // Nombre único para tu aplicación

//if (!admin.apps.length) {
//    admin.initializeApp({
//    credential: admin.credential.cert(serviceAccount),
//  });
//} else {
//    admin.app(); // Obtén la instancia ya inicializada
//}

//const db = admin.firestore();

//module.exports = db;
