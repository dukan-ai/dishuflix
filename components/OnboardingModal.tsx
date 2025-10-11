import React, { useState, useEffect, useRef, useCallback } from 'react';

interface OnboardingModalProps {
  step: 'invite' | 'name';
  onInviteSuccess: () => void;
  onNameSuccess: (name: string) => void;
}

// Per new design: Boxes 1,2,4,5 are letters; 3,6 are numbers.
const validationRules = [
  /^[A-Z]$/i, // Box 1
  /^[A-Z]$/i, // Box 2
  /^[0-9]$/,   // Box 3
  /^[A-Z]$/i, // Box 4
  /^[A-Z]$/i, // Box 5
  /^[0-9]$/    // Box 6
];
const CORRECT_CODE = 'DI5HU3'; // Updated code

const OnboardingModal: React.FC<OnboardingModalProps> = ({ step, onInviteSuccess, onNameSuccess }) => {
  const [inviteCode, setInviteCode] = useState<string[]>(Array(6).fill(''));
  const [userName, setUserName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [shakingBox, setShakingBox] = useState<number | null>(null);
  const [isShakingAll, setIsShakingAll] = useState(false);
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 'invite') {
      codeInputRefs.current[0]?.focus();
    } else {
      nameInputRef.current?.focus();
    }
  }, [step]);

  const validateAndSubmitCode = useCallback(() => {
    setError(null);
    const code = inviteCode.join('');
    
    if (code !== CORRECT_CODE) {
      setError('Invalid invite code. Please try again.');
      setIsShakingAll(true);
      setTimeout(() => setIsShakingAll(false), 500);
      return;
    }
    
    setIsFading(true);
    setTimeout(() => {
      onInviteSuccess();
    }, 300);
  }, [inviteCode, onInviteSuccess]);
  
  useEffect(() => {
    if (inviteCode.join('').length === 6) {
      validateAndSubmitCode();
    }
  }, [inviteCode, validateAndSubmitCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.toUpperCase();
    if (value.length > 1) return; // Enforce single character

    if (value && !validationRules[index].test(value)) {
      setShakingBox(index);
      setTimeout(() => setShakingBox(null), 500); // Animation duration
      return; // Invalid character, do not update state
    }

    const newCode = [...inviteCode];
    newCode[index] = value;
    setInviteCode(newCode);

    // Auto-focus to next input on valid entry
    if (value && index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && inviteCode[index] === '' && index > 0) {
      // If box is empty, move focus to previous box
      codeInputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').toUpperCase();
    if (!pastedText) return;

    const newCode = [...inviteCode];
    let lastValidIndex = -1;

    for (let i = 0; i < 6; i++) {
        const char = pastedText[i];
        if (!char) break;

        if (validationRules[i].test(char)) {
            newCode[i] = char;
            lastValidIndex = i;
        } else {
            setShakingBox(i);
            setTimeout(() => setShakingBox(null), 500);
            break; // Stop on first invalid character
        }
    }
    
    setInviteCode(newCode);
    if (lastValidIndex < 5 && lastValidIndex !== -1) {
        codeInputRefs.current[lastValidIndex + 1]?.focus();
    }
  };


  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateAndSubmitCode();
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onNameSuccess(userName);
    }
  };

  const inviteStep = (
    <div className={`w-full transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Enter Invite Code</h2>
      <p className="text-gray-400 mb-6 sm:mb-8">You need an invite code to continue.</p>
      <form onSubmit={handleInviteSubmit}>
        <div className="flex justify-center gap-3 md:gap-4" onPaste={handlePaste}>
            {inviteCode.map((char, index) => (
                <input
                    key={index}
                    ref={el => { codeInputRefs.current[index] = el; }}
                    type="text"
                    maxLength={1}
                    value={char}
                    onChange={(e) => handleCodeChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className={`w-10 h-12 text-xl sm:w-14 sm:h-16 sm:text-3xl md:w-16 md:h-20 md:text-4xl bg-[#1a1a1a] border-2 rounded-lg text-white font-bold text-center uppercase transition-all duration-300 focus:outline-none focus:border-[#E50914] focus:shadow-[0_0_20px_rgba(229,9,20,0.6)] ${
                        (shakingBox === index || isShakingAll) ? 'animate-shake border-red-500' : 'border-[#404040]'
                    }`}
                    aria-label={`Invite code character ${index + 1}`}
                />
            ))}
        </div>
        {error && <p className="text-red-500 mt-4" role="alert">{error}</p>}
        <button
          type="submit"
          className="w-full mt-8 bg-[#E50914] text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-600/50 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={inviteCode.join('').length !== 6}
        >
          Join
        </button>
      </form>
    </div>
  );

  const nameStep = (
    <div className="w-full animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Welcome to Dishuflix!</h2>
      <p className="text-gray-400 mb-6 sm:mb-8">What should we call you?</p>
      <form onSubmit={handleNameSubmit}>
        <input
          ref={nameInputRef}
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-[#1a1a1a] border-2 border-[#404040] text-white text-xl py-3 px-4 rounded-lg focus:outline-none focus:border-[#E50914] focus:shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all duration-300"
          aria-label="Your Name"
        />
        <button
          type="submit"
          className="w-full mt-6 bg-[#E50914] text-white font-bold py-3 px-4 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={!userName.trim()}
        >
          Let's Go!
        </button>
      </form>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#141414] border border-gray-700 rounded-xl shadow-2xl shadow-red-900/20 p-6 md:p-8 w-full max-w-md md:max-w-lg text-center">
        {step === 'invite' ? inviteStep : nameStep}
      </div>
    </div>
  );
};

export default OnboardingModal;