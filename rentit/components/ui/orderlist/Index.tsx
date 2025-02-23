import { VStack } from '../vstack';
import { Text } from '../text';

export default function OrderedList() {
  const items = [
    'First item',
    'Second item',
    'Third item',
    'Fourth item',
  ];

  return (
    <VStack space="md">
      {items.map((item, index) => (
        <Text key={index} className="text-md">
          {index + 1}. {item}
        </Text>
      ))}
    </VStack>
  );
}
OrderedList.displayName = 'OrderedList';

export { OrderedList }