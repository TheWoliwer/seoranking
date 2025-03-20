import { google } from 'googleapis';

// OAuth2 istemcisi oluşturma
export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Google API'den oturum açma URL'sini oluşturma
export function getGoogleAuthUrl(): string {
  const scopes = [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly'
  ];

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true
  });
}

// Token alma
export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
}

// Token ile Google API'ye erişim
export async function getSearchConsoleData(siteUrl: string, startDate: string, endDate: string) {
  try {
    const searchconsole = google.searchconsole('v1');
    
    const res = await searchconsole.searchanalytics.query({
      auth: oauth2Client,
      siteUrl: siteUrl,
      requestBody: {
        startDate: startDate,
        endDate: endDate,
        dimensions: ['query'],
        rowLimit: 10
      }
    });
    
    return res.data;
  } catch (error) {
    console.error('Google Search Console API hatası:', error);
    throw new Error('Arama verileri alınırken bir hata oluştu');
  }
}