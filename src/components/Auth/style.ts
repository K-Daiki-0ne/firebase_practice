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
  modal: {
    outline: 'none',
    position: 'absolute',
    width: 400,
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: '2px, 2px, 2px black',
    padding: '5%'
  }
});

export default useStyle;