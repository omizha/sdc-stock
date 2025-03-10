import { useMutation } from 'lib-react-query';
import { Request, Response } from 'shared~type-stock';
import { serverApiUrl } from '../../../config/baseUrl';

const useRegisterUser = () => {
  return useMutation<Request.PostCreateUser, Response.GetCreateUser>({
    api: {
      hostname: serverApiUrl,
      method: 'POST',
      pathname: '/stock/user/register',
    },
  });
};

export default useRegisterUser;
