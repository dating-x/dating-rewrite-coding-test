export const loadTranslations = async (locale: string) => {
  const requireContext = import.meta.glob('../../lang/*.json');
  const messages: { [x: string]: Record<string, string> } = {};

  const getFileName = (path: string) => path.split('/').pop() ?? '';
  const getLanguageCode = (fileName: string) => fileName.replace('.json', '');

  for (const path in requireContext) {
    const fileName = getFileName(path);
    const languageCode = getLanguageCode(fileName);

    if (languageCode === locale) {
      const module = (await requireContext[path]()) as { default: Record<string, string> };
      messages[languageCode] = module.default;
    }
  }
  return messages;
};
const lang = loadTranslations(window.appConfig.locale);
export default lang;
