
import React, { useState } from 'react';
import axios from 'axios';

const EchoForm = () => {
    const [echo, setEcho] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse('');

        try {
            const res = await axios.post('/api/echo', { echo });
            setResponse(res.data.reply);
        } catch (err) {
            setResponse('Произошла ошибка. Попробуйте снова позже.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
            <h2>EchoNet — Ты не один</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={echo}
                    onChange={(e) => setEcho(e.target.value)}
                    rows="4"
                    style={{ width: '100%', marginBottom: '1rem' }}
                    placeholder="Напиши, что чувствуешь..."
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Отпускаем...' : 'Отпустить эхо'}
                </button>
            </form>
            {response && (
                <div style={{ marginTop: '2rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                    <strong>Отклик:</strong>
                    <p>{response}</p>
                </div>
            )}
        </div>
    );
};

export default EchoForm;
