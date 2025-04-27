import PasswordStrengthBar from 'react-password-strength-bar-with-style-item';
import style from './ProgressBar.module.css';

const ProgressBar = ({ watch }) => {
    return (
        <div className={style.strengthBarBox}>
            <PasswordStrengthBar
                className={style.strengthBar}
                password={watch('password')}
                barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}
                scoreWords={['weak', 'weak', 'okay', 'good', 'strong']}
                shortScoreWord={''}
                minLength={6}
                scoreWordStyle={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.6)', margin: '0' }}
                scoreWordClassName="strength-score"
            />
        </div>
    );
};

export default ProgressBar;