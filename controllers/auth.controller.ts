import jwt from 'jsonwebtoken';
let refreshTokens: string[] = [];

// Creates a new accessToken using the given refreshToken;
export const Refresh = async (req: any, res: any, next: any) => {
  const refreshToken = req.body.token;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
      return res.json({ message: "Refresh token not found, login again" });
  }

  // If the refresh token is valid, create a new accessToken and return it.
  jwt.verify(refreshToken, "refresh", (err:any, user:any) => {
      if (!err) {
          const accessToken = jwt.sign({ username: user.username }, "access", {
              expiresIn: "5m"
          });

          const refreshToken = jwt.sign({ username: user.username }, "refresh", {
            expiresIn: "15m"
        });
          return res.status(200).json({ success: true, accessToken,refreshToken });
      } else {
          return res.status(401).json({
              success: false,
              message: "Invalid refresh token"
          });
      }
  });
};

// Protected route, can only be accessed when user is logged-in
export const Protected = async (req: any, res: any, next: any) => {
  return res.json({ message: "Protected content!" });
};

export const Login = async (req: any, res: any, next: any) => {
  const user= req.body.user;
  //console.log(user);
 
  if (!user) {
      return res.status(404).json({ message: "Body empty" });
  }

  if (!(user.username == "admin" && user.password == "123456")) {
    return res.status(401).json({ message: "Invalid username and password" });
  }

  let accessToken = jwt.sign(user, "access", { expiresIn: "5m" });
  let refreshToken = jwt.sign(user, "refresh", { expiresIn: "15m" });
  refreshTokens.push(refreshToken);

  return res.status(200).json({
      accessToken,
      refreshToken
  });
};
