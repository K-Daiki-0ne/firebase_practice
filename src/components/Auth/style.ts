import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  loginTogglemode: {
    cursor: 'pointer',
    color: '#0000ff'
  },
  loginModal: {
    textAlign: 'center'
  },
  loginReset: {
    cursor: 'pointer'
  },
  loginHiddenItem: {
    textAlign: 'center',
    display: 'none'
  },
  loginAddIcon: {
    cursor: 'pointer',
    color: 'gray'
  },
  loginAddIconLoaded: {
    cursor: 'pointer',
    color: 'whitesmoke'
  },
  form: {
    width: "100%",
    marginTop: '-2%',
  },
});

export default useStyle;