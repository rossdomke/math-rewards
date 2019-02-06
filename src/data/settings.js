const MathSettings = {
  operators: [{
      name: 'addition',
      operator: '+',
      min: 4,
      max: 16,
    },
    {
      name: 'subtraction',
      operator: '-',
      min: 2,
      max: 14,
    }
  ],
  highestOnTop: true,
  maxProblems: 60,
  maxAttempts: 3,
  problemValue: (10/60),
  minMultiplier: 0.75,
  awardHeartAt: 4,
  maxHearts: 5,
  startingHearts: 5,
}


export {
  MathSettings
}