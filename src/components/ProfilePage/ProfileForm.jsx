// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserInfo } from '../../context/UserContext';
import { updateUserInfo } from '../../services/users';
import { useForm } from '../Forms/useForm';
import './ProfileForm.css';

export default function ProfileForm() {
  const navigate = useNavigate();
  const { userInfo, fetchUserInfo } = useUserInfo();
  const [updatedInfo, handleChange] = useForm({
    // const [updatedInfo] = useForm({
    // adding a defined value to initial undefined state to avoid "uncontrolled to controlled input error"
    username: userInfo.username || '',
    charName: userInfo.charName || '',
    charClass: userInfo.charClass || '',
    charLvl: userInfo.charLvl || '',
    charMod: userInfo.charMod || '',
    // avatarUrl: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateUserInfo(userInfo.id, { updatedInfo });
    await fetchUserInfo();
    navigate('/spell-compendium');
  };

  return (
    <>
      <form
        className="editProfileForm"
        onSubmit={handleSubmit}
      >
        <span>Username</span>
        <input
          placeholder={
            !userInfo.username
              ? 'Username'
              : userInfo.username
          }
          name="username"
          type="text"
          required={!userInfo.username ? true : false}
          value={updatedInfo.username}
          onChange={handleChange}
        />

        <span>Character Name</span>
        <input
          placeholder={
            !userInfo.charName
              ? 'Character name'
              : userInfo.charName
          }
          name="charName"
          type="text"
          required={!userInfo.charName ? true : false}
          value={updatedInfo.charName}
          onChange={handleChange}
        />

        <span>Character Class</span>
        <select
          name="charClass"
          required={!userInfo.charClass ? true : false}
          value={updatedInfo.charClass}
          onChange={handleChange}
        >
          <option value="">
            {!userInfo.charClass
              ? 'Character Class'
              : userInfo.charClass}
          </option>
          <option value="Bard">Bard</option>
          <option value="Cleric">Cleric</option>
          <option value="Druid">Druid</option>
          <option value="Paladin">Paladin</option>
          <option value="Ranger">Ranger</option>
          <option value="Sorcerer">Sorcerer</option>
          <option value="Warlock">Warlock</option>
          <option value="Wizard">Wizard</option>
        </select>

        <span>Character Level</span>
        <select
          name="charLvl"
          required={!userInfo.charLvl ? true : false}
          value={updatedInfo.charLvl}
          onChange={handleChange}
        >
          <option value="">
            {!userInfo.charLvl
              ? 'Character Level'
              : userInfo.charLvl}
          </option>
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

        <span>Spellcasting Ability Modifier</span>
        <select
          name="charMod"
          required={!userInfo.charMod ? true : false}
          value={updatedInfo.charMod}
          onChange={handleChange}
        >
          <option value="">
            {!userInfo.charMod
              ? 'Modifier'
              : userInfo.charMod}
          </option>
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

        <button>Submit</button>
      </form>
      {userInfo.username && (
        <button
          onClick={() => {
            navigate('/profile');
          }}
        >
          Back
        </button>
      )}
    </>
  );
}
