import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { api } from "../../services/api";

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  };
};

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=bf9a9fb38ba50ec065ee`;

  async function signIn(code: string) {
    const response = await api.post<AuthResponse>("/authenticate", {
      code,
    });

    const { token, user } = response.data;

    localStorage.setItem("@heat:token", token);
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes("?code=");

    if (hasGithubCode) {
      const [path, code] = url.split("?code=");

      window.history.pushState({}, "", path);

      // console.log({ path, code });
      signIn(code);
    }
  }, []);

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe suas ideias.</strong>
      <a className={styles.signInWithGithub} href={signInUrl}>
        <VscGithubInverted size="25" />
        ENTRAR COM GITHUB
      </a>
    </div>
  );
}

// FOR FUTURE USE
//       <a
//         className={styles.signInWithGithub}
//         onClick={() => getCode()}
//         // href={signInUrl}
//         href="#"
//       ></a>

//       function getCode() {
//         api.get<string>("/github").then((response) => {
//           setCode(response.data);
//           console.log(response.data);
//         });
//       }

//       const [code, setCode] = useState<string>("");
