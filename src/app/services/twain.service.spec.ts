import { TwainService } from './twain.service';

describe('TwainService', () => {
    let service: TwainService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        service = new TwainService(httpClientSpy as any);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
