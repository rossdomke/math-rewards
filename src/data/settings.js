const MathSettings = {
  operators: [{
      name: 'addition',
      operator: '+',
      min: 4,
      max: 25,
    },
    {
      name: 'subtraction',
      operator: '-',
      min: 2,
      max: 22,
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
