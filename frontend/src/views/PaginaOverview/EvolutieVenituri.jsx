// EvolutieVenituri.jsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const EvolutieVenituri = ({ userId }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/categories/income/${userId}`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchEvolution = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/incomes/user/${userId}/evolution`, {
                    params: {
                        categoryId: selectedCategory
                    }
                });
                const data = response.data;

                const labels = data.map(item => new Date(item.month).toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' }));
                const amounts = data.map(item => item.totalAmount);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Venituri',
                            data: amounts,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching income evolution:', error);
            }
        };

        fetchCategories();
        fetchEvolution();
    }, [userId, selectedCategory]);

    return (
        <div>
            <h2>Evoluția Veniturilor</h2>
            <div>
                <label htmlFor="category-select">Selectează categoria:</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    <option value="">Toate categoriile</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {chartData.labels && (
                <Line
                    data={chartData}
                    options={{
                        scales: {
                            x: { title: { display: true, text: 'Luna' } },
                            y: { title: { display: true, text: 'Venituri' } }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default EvolutieVenituri;
