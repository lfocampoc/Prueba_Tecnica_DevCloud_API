import { environment } from '@environments/environment';
import { HttpHeaders } from '@angular/common/http';

const initialHttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json; text/plain'
});

const Config = {
  api: {
    urlApiService: environment.serviceUrl,
    options: { headers: initialHttpHeaders },
    timeout: 3000
  },
  appParams: {
    currencyMask: {
      align: 'right',
      allowNegative: true,
      decimal: ',',
      precision: 2,
      prefix: '$ ',
      suffix: '',
      thousands: '.'
    },
    session: {
      timeoutLogoutMinutes: 5,
      timeoutWarningMinutes: 4
    },
    translatesPathlibrary: './assets/i18n/'
  },
};

export { Config };
