module.exports = (triggerId, text) => {
  const form = {
    token: process.env.SLACK_ACCESS_TOKEN,
    trigger_id: triggerId,
    dialog: JSON.stringify({
      title: 'Submit a bug',
      callback_id: 'submit-bug',
      submit_label: 'Submit',
      elements: [
        {
          label: 'Title',
          type: 'text',
          name: 'title',
          value: text,
          hint: '30 second summary of the problem',
        },
        {
          label: 'Description',
          type: 'textarea',
          name: 'description',
          hint: 'Tell us more! What did you expect to happen?',
        },
        {
          label: 'Product Feature',
          type: 'select',
          name: 'feature',
          options: [
            { label: 'Core', value: 'triage-core' },
            { label: 'Platform', value: 'triage-platform' },
            { label: 'Mobile', value: 'triage-mobile' },
            { label: 'Desktop', value: 'triage-desktop' },
          ],
          hint: 'What feature does this relate to?',
        },
        {
          label: 'Reproduction steps',
          type: 'textarea',
          name: 'reproduction',
          hint: 'Can you reproduce the problem repeatedly? If so, what are the steps?',
          optional: true,
        },
      ],
    }),
  };

  return form;
};
