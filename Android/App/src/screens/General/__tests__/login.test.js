import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login';
import { firestore } from "../../../config/firebase";

describe('Testing Login Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Login />);
  });

  it('Testing render Login Page', () => {
    expect(wrapper).toBeTruthy();
  });

  it('Testing email input change', () => {
    const emailInput = wrapper.find('TextInput').at(0);
    emailInput.simulate('changeText', 'test@example.com');
    expect(wrapper.state('email')).toEqual('test@example.com');
  });

  it('Testing password input change', () => {
    const passwordInput = wrapper.find('TextInput').at(1);
    passwordInput.simulate('changeText', 'test1234');
    expect(wrapper.state('password')).toEqual('test1234');
  });

  it('Testing navigate to home page', () => {
    const navigationMock = { navigate: jest.fn() };
    wrapper = shallow(<Login navigation={navigationMock} />);
    const homeButton = wrapper.find('TouchableOpacity').at(0);

    homeButton.simulate('press');
    expect(navigationMock.navigate).toHaveBeenCalledWith('Home');
  });

  it('Testing calling login function when button clicked', () => {
    wrapper.instance().Login = jest.fn();
    wrapper.instance().forceUpdate();

    const loginButton = wrapper.find('TouchableOpacity').at(1);
    loginButton.simulate('press');

    expect(wrapper.instance().Login).toHaveBeenCalled();
  });

  it('Testing login to user and navigate to user home page', () => {
    const navigationMock = { replace: jest.fn() };
    const firestoreMock = { collection: jest.fn().mockReturnThis(), doc: jest.fn().mockReturnThis(), get: jest.fn().mockResolvedValue({ data: jest.fn().mockReturnValue({ role: 'user', active: 'Active' }) }) };
    const authMock = { currentUser: { uid: 'testUid' } };
    const auth = jest.fn(() => authMock);
    wrapper.setProps({ navigation: navigationMock });
    auth.signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
    firestore.collection = jest.fn(() => firestoreMock);
    firestore.doc = jest.fn(() => firestoreMock);
    global.alert = jest.fn();
    wrapper.setState({ email: '123@gmail.com', password: '123456' });

    return wrapper.instance().Login().then(() => {
      expect(global.alert).not.toHaveBeenCalled();
      expect(navigationMock.replace).toHaveBeenCalledWith('UserHome');
    })
    .catch((error) => {
        alert(error.message)
    });
  });

  it('Testing login to admin and navigate to admin home page', () => {
    const navigationMock = { replace: jest.fn() };
    const firestoreMock = { collection: jest.fn().mockReturnThis(), doc: jest.fn().mockReturnThis(), get: jest.fn().mockResolvedValue({ data: jest.fn().mockReturnValue({ role: 'admin', active: 'Active' }) }) };
    const authMock = { currentUser: { uid: 'testUid' } };
    const auth = jest.fn(() => authMock);
    wrapper.setProps({ navigation: navigationMock });
    auth.signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
    firestore.collection = jest.fn(() => firestoreMock);
    firestore.doc = jest.fn(() => firestoreMock);
    global.alert = jest.fn();
    wrapper.setState({ email: 'jason@gmail.com', password: '123456' });

    return wrapper.instance().Login().then(() => {
      expect(global.alert).not.toHaveBeenCalled();
      expect(navigationMock.replace).toHaveBeenCalledWith('AdminHome');
    })
    .catch((error) => {
        alert(error.message)
    });
  });

  it('Testing login to Deactive user account and getting alert', () => {
    const navigationMock = { replace: jest.fn() };
    const firestoreMock = { collection: jest.fn().mockReturnThis(), doc: jest.fn().mockReturnThis(), get: jest.fn().mockResolvedValue({ data: jest.fn().mockReturnValue({ role: 'user', active: 'Deactive' }) }) };
    const authMock = { currentUser: { uid: 'testUid' } };
    const auth = jest.fn(() => authMock);
    wrapper.setProps({ navigation: navigationMock });
    auth.signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
    firestore.collection = jest.fn(() => firestoreMock);
    firestore.doc = jest.fn(() => firestoreMock);
    global.alert = jest.fn();
    wrapper.setState({ email: '123@gmail.com', password: '123456' });

    return wrapper.instance().Login().then(() => {
      expect(global.alert).toHaveBeenCalled();
      expect(navigationMock.replace).not.toHaveBeenCalledWith('AdminHome');
    })
    .catch((error) => {
        alert(error.message)
    });
  });

  it('Testing failed to sign in user and return error', async () => {
    const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});
    const authMock = { signInWithEmailAndPassword: jest.fn() };
    const navigationMock = { replace: jest.fn() };
    wrapper.setProps({ navigation: navigationMock });
  
    authMock.signInWithEmailAndPassword.mockRejectedValue(new Error('Authentication failed'));
    wrapper.setState({ email: 'test@example.com', password: 'testPassword' });
  
    await wrapper.instance().Login();
    expect(alertMock).toHaveBeenCalled();
  });
});