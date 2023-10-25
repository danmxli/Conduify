import React from 'react';

const SubmitText = ({ value, onChange, placeholder }) => {
    return (
        <form>

            <div className="w-full px-4 py-4 rounded-3xl bg-gray-600">
                <textarea id="comment" rows="4" className="w-full px-0 focus:outline-none text-sm bg-gray-600 focus:ring-0 text-white placeholder-gray-400" required
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                ></textarea>
            </div>
        </form>
    );
};

export default SubmitText;