import { colors } from './Colors';

export const institutionsStyles = {
  institutionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  institutionCard: {
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  institutionTitle: {
    fontSize: 17,
    flex: 1,
  },
  institutionButton: {
    backgroundColor: colors.link,
    padding: 10,
    borderRadius: 3,
    marginLeft: 5,
  },
  institutionTopBackground: {
    backgroundColor: 'transparent',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: -1
  },
  institutionImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  institutionName: {
    fontSize: 27,
    marginBottom: 5,
    fontWeight: '600',
  },
}