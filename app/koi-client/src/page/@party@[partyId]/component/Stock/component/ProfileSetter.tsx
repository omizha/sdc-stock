import { useEffect } from 'react';
import { useAtomValue } from 'jotai';
import { Query } from '../../../../../hook';
import { UserStore } from '../../../../../store';

interface Props {
  stockId: string;
}

const ProfileSetter = ({ stockId }: Props) => {
  const supabaseSession = useAtomValue(UserStore.supabaseSession);

  const { data: user } = Query.Supabase.useMyProfile({ supabaseSession });
  const { mutateAsync } = Query.Stock.useRegisterUser();

  const userId = user?.data?.id;
  const gender = user?.data?.gender;
  const nickname = user?.data?.username;

  useEffect(() => {
    if (!userId || !gender || !nickname) return;

    mutateAsync({
      stockId,
      userId,
      userInfo: {
        gender,
        nickname,
      },
    });
  }, [gender, mutateAsync, nickname, stockId, userId]);

  return <></>;
};

export default ProfileSetter;
