use('interview-questions')

db.questions.updateMany(
  { description: { $exists: true } },
  { $rename: { description: 'definition' } },
)

db.questions.updateMany({}, [
  {
    $set: {
      answers: {
        $map: {
          input: '$answers',
          as: 'item',
          in: {
            $mergeObjects: [
              '$$item',
              {
                detail: '$$item.answer',
              },
            ],
          },
        },
      },
    },
  },
  {
    $set: {
      answers: {
        $map: {
          input: '$answers',
          as: 'item',
          in: {
            $unsetField: {
              field: 'answer',
              input: '$$item',
            },
          },
        },
      },
    },
  },
])
