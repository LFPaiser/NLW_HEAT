import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext);

  console.log(user);

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
