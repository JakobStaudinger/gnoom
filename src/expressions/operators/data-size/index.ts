import { $binarySize } from './$binarySize';
import { $bsonSize } from './$bsonSize';

export interface DataSizeOperators extends $binarySize, $bsonSize {}
