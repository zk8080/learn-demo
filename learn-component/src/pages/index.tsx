import styles from './index.less';
import { http } from '@/utils/request';
import { useEffect } from 'react';

export default function IndexPage() {

  useEffect(() => {
    const getData = async () => {
      const res = await http.get<string>('/test', {params: {a: 1}});
      console.log(res.data)
      console.log(res, '---res--');
    }
    getData();
  }, [])

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
