import { ICONS } from '../../assets';
import './loading.css';

function Loading() {
  return (
    <div className="loading">
      <img src={ICONS.loading} />
    </div>
  );
}
export default Loading;
