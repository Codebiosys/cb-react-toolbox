import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({ noKey: true }));
