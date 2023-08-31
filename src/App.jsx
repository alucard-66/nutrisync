'use client'
import React, { useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import 'bootstrap/dist/css/bootstrap.css';
import logo  from '/src/logomain.png';

const App = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState('');
  const [selectedCuisineStyle, setSelectedCuisineStyle] = useState('');
  const [healthProblem, setHealthProblem] = useState('');
  const [selectedDietStyle, setSelectedDietStyle] = useState('');
  const [selectedGoal, setGoals] = useState('');

  const ageCategories = [
    '18-25',
    '26-35',
    '36-45',
    '46-55',
    '56 and above',
  ];

  const presetCuisineStyles = [
    'Italian',
    'Indian',
    'Chinese',
    'Mexican',
    'Japanese',
    'Mediterranean',
    'Thai',
    'French',
    'Greek',
    'Korean',
  ];

  const dietStyles = [
    'Ketogenic Diet',
    'Low Carb High Fat (LCHF)',
    'Paleolithic Diet',
    'Vegetarian Diet',
    'Vegan Diet',
    'Mediterranean Diet',
    'DASH Diet',
    'Weight Watchers (WW)',
    'Zone Diet',
    'Intermittent Fasting'
    // Add more diet styles here
  ];
  const goals = [
    'Weight loss',
    'Weight gain',
    'weight maintenance',
    'Muscle gain',
    'Improved energy levels',
    // Add more diet styles here
  ];

  const presetHealthIssues = [
    {
      name: 'Diabetes',
      restrictions: 'Limit sugar and carbohydrate intake.',
    },
    {
      name: 'High Blood Pressure',
      restrictions: 'Reduce sodium intake and focus on low-sodium foods.',
    },
    {
      name: 'Gluten Sensitivity',
      restrictions: 'Avoid foods containing gluten (wheat, barley, rye).',
    },
    {
      name: 'Lactose Intolerance',
      restrictions: 'Avoid dairy products or use lactose-free alternatives.',
    },
    {
      name: 'Celiac Disease',
      restrictions: 'Strictly avoid gluten-containing foods.',
    },
    {
      name: 'Caffeine Hypersensitivity',
      restrictions: 'Strictly avoid foods and beverages that contain caffeine, including coffee, soda, energy drinks, tea and chocolate.',
    },
    {
      name: 'Fructose intolerance',
      restrictions: 'Strictly avoid foods like Honey, corn syrup.',
    },
    {
      name: 'Histamine intolerance',
      restrictions: 'Strictly avoid alcohol and other fermented beverages and processed or smoked meats and shellfish.',
    },
    // Add more health issues and restrictions here
  ];

  const dietPlans = [
    'Mediterranean Diet',
    'Paleo Diet',
    'Vegetarian Diet',
    'Vegan Diet',
    // Add more diet plans here
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = generatePrompt();

    fetch('https://c3-na.altogic.com/e:64dded203eae876aaf4a9f8b/travel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.choices[0].message.content);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const generatePrompt = () => {
    const prompt = `Generate a 7-day diet plan and simple Home workout plan for a person who is trying to achieve ${selectedGoal} of Age: ${age} whose Preferred cuisine is ${selectedCuisineStyle} who has the Dietary preference: ${selectedDietStyle} and has the Health condition of ${healthProblem}`;

    return prompt;
  };

  const handleGoals = (event) => {
    setGoals(event.target.value);
  };
  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCuisineStyleChange = (event) => {
    setSelectedCuisineStyle(event.target.value);
  };

  const handleDietStyleChange = (event) => {
    setSelectedDietStyle(event.target.value);
  };

  const handleHealthProblemChange = (event) => {
    setHealthProblem(event.target.value);
  };

  return (
    <div className='container-fluid main'>
      <div className="text-center my-4 ">
        {/* <Image src={logo} alt='logo' className='logo'/> */}
        <img src={logo} className='logo'/>
        <h6 className='my-2'>Your Health Harmony, Crafted Digitally!</h6>
      </div>
      <div className="d-flex flex-md-row flex-column gap-4">
        <form onSubmit={handleSubmit} className='flow-content shadow p-4 sticky-md-top'>
          <h5 className=''>Craft Your Ideal Diet Plan</h5>
          {/* <div>
            Name:
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div> */}
          <div>
            Age:
            <select value={age} onChange={handleAgeChange} className='form-select' style={{width:'20rem'}}>
              <option value="">Select Age</option>
              {ageCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            Cuisine Style:
            <select
              value={selectedCuisineStyle}
              onChange={handleCuisineStyleChange}
              className='form-select'
              style={{width:'20rem'}}
            >
              <option value="">Select Cuisine Style</option>
              {presetCuisineStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
          <div>
            Diet Style:
            <select value={selectedDietStyle} onChange={handleDietStyleChange} className='form-select' style={{width:'20rem'}}>
              <option value="">Select Diet Style</option>
              {dietStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
          <div>
            Health Goals:
            <select value={selectedGoal} onChange={handleGoals} className='form-select' style={{width:'20rem'}}>
              <option value="">Select Health Goals</option>
              {goals.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
          <div>
            Health Problem:
            <select value={healthProblem} onChange={handleHealthProblemChange} className='form-select' style={{width:'20rem'}}>
              <option value="">Select Health Problem</option>
              {presetHealthIssues.map((issue) => (
                <option key={issue.name} value={issue.name}>
                  {issue.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className='btn btn-primary my-4 d-grid mx-auto'>Generate </button>
        </form>
        <div className='shadow p-4 flex-grow-1'>
          {loading && <p className='text-center'>Whipping Up Your personalized Plan...Pls wait...</p>}
          {response && <ReactMarkdown>{response}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
};

export default App;


