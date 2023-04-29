import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../Profile';
import { act } from 'react-test-renderer';
import { firestore, auth } from "../../../config/firebase";

describe('Testing Profile Page', () => {

    let wrapper;
    const navigation = {
        navigate: jest.fn()
    };

    beforeEach(() => {
        wrapper = shallow(<Profile navigation={navigation} />);
    });

  it('Testing profile renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Testing navigate to favorite page', () => {
    const favButton = wrapper.find('TouchableOpacity').at(0);

    favButton.simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith('Favorite');
  });
  
  it('Testing navigate to Edit Profile page', () => {
    const editProfileButton = wrapper.find('TouchableOpacity').at(2);

    editProfileButton.simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith('EditProfile', {"user": null});
  });

  it('Testing navigate to home page', () => {
    const homeButton = wrapper.find('TouchableOpacity').at(3);

    homeButton.simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith('UserHome');
  });

  it('Testing navigate to profile page', () => {
    const profileButton = wrapper.find('TouchableOpacity').at(4);

    profileButton.simulate('press');
    expect(navigation.navigate).toHaveBeenCalledWith('Profile');
  });

});

describe('Testing Profile Page Function', () => {

    const mockedUser = {
        firstName: 'John',
        lastName: 'Doe',
        gender: 'Male',
        dob: '01-01-2000',
        address1: '123 Main St',
        address2: '',
        city: 'New York',
        email: 'johndoe@example.com',
      };
      
      const userDocMock = {
        data: () => mockedUser,
      };
      
    const firestoreMock = { collection: jest.fn().mockReturnThis(), doc: jest.fn().mockReturnThis({ auth: {currentUser: { uid: jest.fn().mockReturnValue('3cOrktyvV0bgalSIPaa4Ktja43F2')}}}), get: jest.fn().mockResolvedValue({ data: jest.fn().mockReturnValue(userDocMock)}) };

      const authMock = {
        currentUser: {
          uid: '3cOrktyvV0bgalSIPaa4Ktja43F2',
        },
      };
      

    //   it('fetches user data and updates the state', async () => {
    //     firestore.collection = jest.fn(() => firestoreMock);
    //     firestore.doc = jest.fn(() => firestoreMock);
    //     const auth = jest.fn(() => authMock);
    //     auth.signInWithEmailAndPassword = jest.fn(() => Promise.resolve());
    //     const wrapper = shallow(<Profile />);
    //     const instance = wrapper.instance();
    
    //     // Call the fetchUserData function and wait for it to complete
    //     await act(async () => {
    //       await instance.fetchUserData();
    //     });
    
    //     // Check if the state has been updated correctly
    //     expect(wrapper.state('user')).toEqual(mockedUser);
    //   });
      
    const mockNavigation = {
        replace: jest.fn(),
    };

    it('should sign out the user and navigate to the Home screen', () => {
        jest.mock('../../../config/firebase', () => ({
            signOut: jest.fn(),
        }));
        const wrapper = shallow(<Profile navigation={mockNavigation} />);
    
        const signOutButton = wrapper.find('TouchableOpacity').at(1);
        signOutButton.simulate('press');
    
        expect(mockNavigation.replace).toHaveBeenCalledWith('Home');
      });
});