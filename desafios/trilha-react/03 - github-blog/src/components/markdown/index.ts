import { styled } from '../../styles'
import ReactMarkdown from 'react-markdown'

export const Markdown = styled(ReactMarkdown, {
  pre: {
    backgroundColor: '$basePost',
    padding: '$lg',
    borderRadius: 2,
    overflow: 'hidden',
    whiteSpace: 'pre-wrap',
  },
  ol: {
    paddingLeft: '2rem',
    fontSize: '$md',
  },
})
