import bcrypt from "bcrypt";

export interface encryptParams {
  str: string;
  salt?: string;
}

export interface matchEncryptParams {
  str: string;
  encryptStr: string;
  salt?: string;
}

export const encrypt = ({
  str,
  salt = bcrypt.genSaltSync(),
}: encryptParams): string => {
  return bcrypt.hashSync(str, salt);
};

export const matchEncrypt = ({
  str,
  encryptStr,
}: matchEncryptParams): boolean => {
  return bcrypt.compareSync(str, encryptStr);
};
