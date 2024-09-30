import { registerAs } from '@nestjs/config';

export default registerAs('app', () => {
  const returnObj = {
    apiPort: Number(process.env.API_PORT),
    jwtPublicKey: process.env.SERVER_JWT_PUBLIC_KEY,
    jwtPrivateKey: process.env.SERVER_JWT_PRIVATE_KEY,
    cryptoKey: process.env.CRYPTO_KEY,
    cryptoIV: process.env.CRYPTO_IV,
  };
  return returnObj;
});
