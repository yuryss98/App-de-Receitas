import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  return (
    <>
      <h1>Profile</h1>
      <Footer history={ history } />
    </>
  );
}

export default Profile;
