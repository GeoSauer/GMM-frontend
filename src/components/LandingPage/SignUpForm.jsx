import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import { useForm } from '../Forms/useForm';
import './SignInUp.css';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { signUp, error } = useAuth();
  const [info, handleChange] = useForm({
    email: '',
    password: '',
    username: '',
    charName: '',
    charClass: '',
    charLvl: '',
    charMod: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await signUp(info);
    navigate('/spell-compendium');
  };

  return (
    <>
      <form className="signUpForm" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <h3>
          All fields are required but can be edited later if
          needed.
        </h3>

        <label htmlFor="email">Email</label>
        <input
          placeholder="Email"
          name="email"
          type="email"
          required
          value={info.email}
          onChange={handleChange}
        />
        <br></br>

        <label htmlFor="password">Password</label>
        <input
          placeholder="Password"
          name="password"
          type="password"
          required
          value={info.password}
          onChange={handleChange}
        />
        <br></br>

        <label htmlFor="username">Username</label>
        <input
          placeholder="Username"
          name="username"
          type="text"
          required
          value={info.username}
          onChange={handleChange}
        />
        <br></br>

        <label htmlFor="charName">Character Name</label>
        <input
          placeholder="Character Name"
          name="charName"
          type="text"
          required
          value={info.charName}
          onChange={handleChange}
        />
        <br></br>

        <label htmlFor="charClass">Character Class</label>
        <select
          name="charClass"
          required
          value={info.charClass}
          onChange={handleChange}
        >
          <option value="">Please Choose One</option>
          <option value="Bard">Bard</option>
          <option value="Cleric">Cleric</option>
          <option value="Druid">Druid</option>
          <option value="Paladin">Paladin</option>
          <option value="Ranger">Ranger</option>
          <option value="Sorcerer">Sorcerer</option>
          <option value="Warlock">Warlock</option>
          <option value="Wizard">Wizard</option>
        </select>
        <br></br>

        <label htmlFor="charLvl">Character Level</label>
        <select
          name="charLvl"
          required
          value={info.charLvl}
          onChange={handleChange}
        >
          <option value="">Please Choose One</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
        </select>
        <br></br>

        <span>Spellcasting Ability Modifier</span>
        <select
          name="charMod"
          required
          value={info.charMod}
          onChange={handleChange}
        >
          <option value="">Please Choose One</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <br></br>

        <button>Submit</button>
        <p className="error">{error}</p>
      </form>
      <button
        onClick={() => {
          navigate('/welcome');
        }}
      >
        Back
      </button>
    </>
  );
}
