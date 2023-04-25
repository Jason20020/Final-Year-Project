import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignUp from '../SignUp';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

describe('Testing SignUp Page', () => {

  it('Testing SignUp Render', () => {
    const { getByTestId } = render(<SignUp />);
    expect(getByTestId('generalSignUp')).toBeTruthy();
  });

  it('Testing email handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const emailInput = getByPlaceholderText('Enter Email');
    
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('Testing first name handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const firstNameInput = getByPlaceholderText('Enter First Name');
    
    fireEvent.changeText(firstNameInput, 'Jason');
    expect(firstNameInput.props.value).toBe('Jason');
  });

  it('Testing last name handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const lastNameInput = getByPlaceholderText('Enter Last Name');
    
    fireEvent.changeText(lastNameInput, 'Chai');
    expect(lastNameInput.props.value).toBe('Chai');
  });

  it('Testing gender handler', () => {
    const signUp = create(<SignUp />);
    
    const signUpInstance = signUp.getInstance();
    
    expect(signUpInstance.state.gender).toBe('');

    signUpInstance.handleGenderChange('Male');

    expect(signUpInstance.state.gender).toBe('Male');
  });

  it('Testing DOB handler', () => {
    const signUp = create(<SignUp />);
    
    const signUpInstance = signUp.getInstance();

    expect(signUpInstance.state.dob).toBe('');

    const selectedDate = new Date(2000, 0, 1);
    const formattedDate = '1/1/2000';

    signUpInstance.handleDOBChange(null, selectedDate);

    expect(signUpInstance.state.dob).toBe(formattedDate);
  });

  it('Testing address 1 handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const address1Input = getByPlaceholderText('Enter Address 1');
    
    fireEvent.changeText(address1Input, 'Henry Street');
    expect(address1Input.props.value).toBe('Henry Street');
  });

  it('Testing address 2 handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const address2Input = getByPlaceholderText('Enter Address 2');
    
    fireEvent.changeText(address2Input, 'Limerick');
    expect(address2Input.props.value).toBe('Limerick');
  });

  it('Testing city handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const cityInput = getByPlaceholderText('Enter City');
    
    fireEvent.changeText(cityInput, 'Limerick');
    expect(cityInput.props.value).toBe('Limerick');
  });

  it('Testing password handler', () => {
    const { getByPlaceholderText } = render(<SignUp />);
    const passwordInput = getByPlaceholderText('Enter Password');
    
    fireEvent.changeText(passwordInput, 'mypassword');
    expect(passwordInput.props.value).toBe('mypassword');
  });

  it('Testing DatePicker show when button is pressed', () => {
    const { getByText, queryByTestId } = render(<SignUp />);
    
    expect(queryByTestId('dateTimePicker')).toBeNull();

    const pickDateButton = getByText('Pick Date');
    fireEvent.press(pickDateButton);

    expect(queryByTestId('dateTimePicker')).toBeTruthy();
  });

});

describe('Testing Navigate to Home Page', () => {
    let wrapper;

    it('Testing navigate to home page', () => {
        const navigationMock = { navigate: jest.fn() };
        wrapper = shallow(<SignUp navigation={navigationMock} />);
        const homeButton = wrapper.find('TouchableOpacity').at(0);
    
        homeButton.simulate('press');
        expect(navigationMock.navigate).toHaveBeenCalledWith('Home');
      });
});

 describe('Testing SignUp Function', () => {

    // This testing is successful but it will create a new user account in firebase so have to comment it out

    // it('successful registration', async () => {
    //     const navigation = { navigate: jest.fn() };
    //     const auth = {
    //         createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ email: 'test@example.com', password: 'test_password' })),
    //         currentUser: {
    //           uid: 'test-user-id',
    //         },
    //       };
          
    //       const firestore = {
    //         collection: jest.fn(() => ({
    //           doc: jest.fn(() => ({
    //             set: jest.fn(() => Promise.resolve()),
    //           })),
    //         })),
    //       };

    //       const wrapper = shallow(<SignUp auth={auth} firestore={firestore} navigation={navigation} />);

    //       wrapper.setState({
    //         firstName: 'Test',
    //         lastName: 'User',
    //         gender: 'Male',
    //         dob: '01/01/1990',
    //         address1: '123 Street',
    //         address2: 'Apt 4B',
    //         city: 'Test City',
    //         email: 'test@example.com',
    //         password: 'test_password',
    //       });
      

    //       global.alert = jest.fn();
      
    //       return wrapper.instance().handleSignUp().then(() => {
    //         expect(global.alert).not.toHaveBeenCalled();
    //         expect(auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'test_password');
    //         expect(navigation.navigate).toHaveBeenCalledWith('Login');
    //       })
    //       .catch((error) => {
    //         alert(error.message)
    //     });
    //   });

      it('Testing Failure registration', async () => {
        const navigation = { navigate: jest.fn() };
        const auth = {
            createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ email: 'jason@gmail.com', password: '123456' })),
            currentUser: {
              uid: 'test-user-id',
            },
          };
          
          const firestore = {
            collection: jest.fn(() => ({
              doc: jest.fn(() => ({
                set: jest.fn(() => Promise.resolve()),
              })),
            })),
          };

          const wrapper = shallow(<SignUp auth={auth} firestore={firestore} navigation={navigation} />);

          wrapper.setState({
            firstName: 'Test',
            lastName: 'User',
            gender: 'Male',
            dob: '01/01/1990',
            address1: '123 Street',
            address2: 'Apt 4B',
            city: 'Test City',
            email: 'jason@gmail.com',
            password: '123456',
          });
      

          global.alert = jest.fn();
      
          return wrapper.instance().handleSignUp().then(() => {
            expect(global.alert).toHaveBeenCalled();
          })
      });
  });