// EvolutieCheltuieli.jsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const EvolutieCheltuieli = ({ userId }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/categories/expense/${userId}`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchEvolution = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/expenses/user/${userId}/evolution`, {
                    params: {
                        categoryId: selectedCategory
                    }
                });
                const data = response.data;

                const labels = data.map(item => new Date(item.month + '-01').toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' }));
                const amounts = data.map(item => item.totalAmount);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Cheltuieli',
                            data: amounts,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching expense evolution:', error);
            }
        };

        fetchCategories();
        fetchEvolution();
    }, [userId, selectedCategory]);

    return (
        <div>
            <h2>Evoluția Cheltuielilor</h2>
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
                            y: { title: { display: true, text: 'Cheltuieli' } }
                        }
                    }}
                />
            )}
        </div>
    );
};

export default EvolutieCheltuieli;
