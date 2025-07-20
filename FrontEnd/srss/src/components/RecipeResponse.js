import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { RecipeContext } from './Recipe';
import '../CSS/RecipeResponse.css';

export default function RecipeResponse() {
  const { ingredient } = useContext(RecipeContext);
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectDish, setSelect] = useState(null);
  const [cooking, setCooking] = useState([]);
  const [error, setError] = useState('');

  const headers = {
    'Authorization': `Bearer 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`,
    'HTTP-Referer': 'http://localhost:3001',
    'X-Title': 'Flavoura Recipe Suggester',
    'Content-Type': 'application/json',
  };

  const generatePrompt = () => {
    return `You are a very strict recipe expert. If any of these ingredients are not edible or are not food-related including chemicals, respond with only this message exactly:
"You can't make a dish with the ingredients that are not edible for living beings.,"

Otherwise, suggest 5 unique ${ingredient.meal} dishes in ${ingredient.cuisine} cuisine using these ingredients: ${ingredient.ingredients.join(', ')}. Respond with only a comma-separated list of dish names.`;
  };

  useEffect(() => {
    if (!ingredient || !ingredient.ingredients.length || !ingredient.meal || !ingredient.cuisine) {
      console.warn("Insufficient data to fetch dishes", ingredient);
      return;
    }

    const fetchDishes = async () => {
      setLoading(true);
      setError('');
      try {
        const prompt = generatePrompt();
        const response = await axios.post(
          'https://openrouter.ai/api/v1/chat/completions',
          {
            model: 'tngtech/deepseek-r1t2-chimera:free',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
          },
          { headers }
        );

        const raw = response.data.choices[0].message.content.trim();

        if (raw.includes("not edible for living beings")) {
          setError(raw);
          setDishes([]);
        } else {
          const dishList = raw.replace(/<.*?>/g, '').split(',').map(d => d.trim()).filter(Boolean);
          setDishes(dishList);
        }
      } catch (err) {
        console.error('Error fetching dishes:', err);
        if (err.response?.status === 429) {
          setError("Rate limit reached. Please wait and try again.");
        } else {
          setError("OpenRouter API limit reached or error occurred. Try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [ingredient]);

  const fetchCookingSteps = async (dish) => {
    setLoading(true);
    setSelect(dish);
    setCooking([]);
    setError('');

    const cookPrompt = `Explain how to make "${dish}" as a ${ingredient.meal} in ${ingredient.cuisine} cuisine using ${ingredient.ingredients.join(', ')}. 
Break it into 5 to 8 short cooking steps in English. Do NOT use any AI phrases like 'Hey there!' or 'Here's a recipe...'. Just write:

Step 1: ...
Step 2: ...
Each step should be short and clear, like handwritten recipe notes.`;

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'tngtech/deepseek-r1t2-chimera:free',
          messages: [{ role: 'user', content: cookPrompt }],
          temperature: 0.7,
        },
        { headers }
      );

      const content = response.data.choices[0].message.content;
      const steps = content
        .split(/\n+/)
        .filter(line => line.toLowerCase().startsWith("step"))
        .map(line => line.trim());

      setCooking(steps);
    } catch (err) {
      console.error('Error fetching cooking steps:', err);
      if (err.response?.status === 429) {
        setError("Rate limit reached. Please wait a bit.");
      } else {
        setError("Couldn't fetch steps. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-wrapper">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && dishes.length > 0 && (
        <div className="dish-list">
          {dishes.map((dish, idx) => (
            <button
              key={idx}
              onClick={() => !loading && fetchCookingSteps(dish)}
              className="dish-button"
              disabled={loading}
            >
              {dish}
            </button>
          ))}
        </div>
      )}

      {!loading && selectDish && cooking.length > 0 && (
        <div className="recipe-card">
          <h2>{selectDish}</h2>
          <div className="step-container">
            {cooking.map((step, index) => (
              <div className="step-card" key={index}>
                {step}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
