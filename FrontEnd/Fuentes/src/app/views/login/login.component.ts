import {
  Component,
  inject,
  OnInit
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { CustomIconService } from "@common/custom-icons/custom-icon.service";
import { LoginService } from "@services/login-service";
import { ThemeService } from "@services/theme-service";
import { Router } from "@angular/router";
import { SessionService } from "@utils/session-util";

@Component({
  selector: 'screen-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  themeService: ThemeService = inject(ThemeService);

  showPassword: boolean

  public formLogin: FormGroup;
  public errorLogin: boolean;
  public errorService: string[] | undefined = [];

  constructor(
    private customIconService: CustomIconService,
    private loginService: LoginService,
    private router: Router,
    private sessionService: SessionService,
    private fb: FormBuilder,
  ) {
    this.customIconService.init();
  }

  public changueTheme() {
    this.themeService.updateTheme();
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  public processLogin(form: any) {
    const userDataRequest = {
      email: form.email,
      password: form.password
    }

    this.loginService.doLogin(userDataRequest).subscribe(responseLogin => {
      if (responseLogin.success) {
        this.sessionService.saveSessionData(responseLogin.data);
        this.sessionService.saveSessionToken(responseLogin.data.token);

        this.router.navigateByUrl('/virtualmachine');
      } else {
        this.errorLogin = true;
        this.errorService = responseLogin.errors
      }
    });
  }
}