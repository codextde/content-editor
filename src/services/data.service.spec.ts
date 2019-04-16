import {TestBed} from '@angular/core/testing';

import {DataService} from './data.service';
import {IContentItem} from '../models/contentItem.model';

describe('DataService', () => {
  let dataService: DataService;

  const testDataFromDesigner = {
    Items: [{
      Items: null,
      Selected: false,
      Quantity: null,
      Disabled: null,
      ResponseType: 0,
      Template: 0,
      Children: [],
      ResponseContent: null,
      Settings: {},
      ContentAll: null,
      isNew: false,
      Cells: [],
      ContentItemDisplaySettings: [],
      Positions: null,
      Id: 4,
      Type: 'headline',
      Width: null,
      TextTypeId: null,
      ScoringType: 0,
      TitleLeft: '',
      TitleTop: '',
      TitleRight: '',
      TitleBottom: '',
      Content: 'Example',
      Align: null,
      Inline: false,
      DisplayOrder: 0,
      OriginId: null,
      IsEditable: true,
      IsNotAdministered: false,
      AdditionalPropertyValues: [],
      OwnerIsDeleted: false,
      IsDeleted: false,
      _cid: 0,
      RefItemUnitId: 333,
      ContentItemProperties: [
        {
          Id: 233,
          ContentItemId: 5908,
          ContentItemPropertyTypeId: 5,
          Value: '{"name":"general","float":"none"}',
          IsDeleted: false,
          ContentItemPropertyType: null
        },
        {
          ContentItemId: 5908,
          ContentItemPropertyTypeId: 13,
          Value: '{"name":"text","textAlign":"center","fontSize.px":33}',
          IsDeleted: false,
          ContentItemPropertyType: null
        }
      ]
    }, {
      Items: null,
      Selected: false,
      Quantity: null,
      Disabled: null,
      ResponseType: 0,
      Template: 0,
      Children: [],
      ResponseContent: null,
      Settings: {},
      ContentAll: null,
      isNew: false,
      Cells: [],
      ContentItemDisplaySettings: [],
      Positions: null,
      Id: 5,
      Type: 'text',
      Width: null,
      TextTypeId: null,
      ScoringType: 0,
      TitleLeft: '',
      TitleTop: '',
      TitleRight: '',
      TitleBottom: '',
      Content: 'Small example for testing :-)',
      Align: null,
      Inline: false,
      DisplayOrder: 0,
      OriginId: null,
      IsEditable: true,
      IsNotAdministered: false,
      AdditionalPropertyValues: [],
      OwnerIsDeleted: false,
      IsDeleted: false,
      _cid: 0,
      RefItemUnitId: 333,
      ContentItemProperties: []
    }],
    Selected: false,
    Quantity: null,
    Disabled: null,
    ResponseType: 0,
    Template: 0,
    Children: [],
    ResponseContent: null,
    Settings: {},
    ContentAll: null,
    isNew: false,
    Cells: [],
    ContentItemDisplaySettings: [],
    Positions: null,
    Id: 3,
    Type: 'content-editor',
    Width: null,
    TextTypeId: null,
    ScoringType: 0,
    TitleLeft: '',
    TitleTop: '',
    TitleRight: '',
    TitleBottom: '',
    Content: '',
    Align: null,
    Inline: false,
    DisplayOrder: 0,
    OriginId: null,
    IsEditable: true,
    IsNotAdministered: false,
    AdditionalPropertyValues: [],
    OwnerIsDeleted: false,
    IsDeleted: false,
    _cid: 0,
    RefItemUnitId: 333,
    ContentItemProperties: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService]
    });

    dataService = TestBed.get(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should return correct content item property type id', () => {
    expect(dataService.getContentItemPropertyTypeId('css')).toEqual(3);
  });

  it('should convert from designer to content editor', async () => {
    // First convert
    await dataService.convertToContentEditor(testDataFromDesigner);

    // Item ID should be the same
    expect(dataService.contentEditorContentItem.Id).toBe(3);

    // We should have only 2 elements in our editor
    expect(dataService.contentEditorElements.length).toBe(2);
    const headline = dataService.contentEditorElements.find(element => element.component == 'headline');
    expect(headline).not.toBeUndefined();
    expect(headline.Id).toBe(4);
    expect(dataService.contentEditorElements.find(element => element.component == 'text')).not.toBeUndefined();
    expect(dataService.contentEditorElements.find(element => element.component == 'text').Id).toBe(5);
    expect(dataService.contentEditorElements.find(element => element.component == 'html')).toBeUndefined();

    // Check if headline is centered and not floated
    expect(headline.properties.find(element => element.name == 'general')).not.toBeUndefined();
    expect(headline.properties.find(element => element.name == 'general').float).toBe('none');
  });

  it('should convert from content editor to designer', async () => {
    // First convert from designer to content editor
    await dataService.convertToContentEditor(testDataFromDesigner);
    expect(dataService.contentEditorElements.find(element => element.component == 'html')).toBeUndefined();

    // Now adding an new component
    dataService.contentEditorElements.push({
      component: 'html',
      properties: []
    });
    expect(dataService.contentEditorElements.find(element => element.component == 'html')).not.toBeUndefined();

    // Then back to designer
    let designerData = dataService.convertToDesigner();

    // Item ID should be the same
    expect(designerData.Id).toBe(3);

    // We should have only 3 elements in our editor
    expect(designerData.Items.length).toBe(3);
    expect(designerData.Items.find(element => element.Type == 'headline')).not.toBeUndefined();
    expect(designerData.Items.find(element => element.Type == 'headline').Id).toBe(4);
    expect(designerData.Items.find(element => element.Type == 'text')).not.toBeUndefined();
    expect(designerData.Items.find(element => element.Type == 'text').Id).toBe(5);
    expect(designerData.Items.find(element => element.Type == 'html')).not.toBeUndefined();
    expect(designerData.Items.find(element => element.Type == 'css')).toBeUndefined();

    // Lets delete the text
    const textToDelete = dataService.contentEditorElements.find(element => element.component == 'text');
    const indexOfText = dataService.contentEditorElements.indexOf(textToDelete);
    dataService.contentEditorElements.splice(indexOfText, 1);

    designerData = dataService.convertToDesigner();
    expect(designerData.Items.length).toBe(3);

    const textItem = designerData.Items.find(element => element.Type == 'text');
    expect(textItem).not.toBeUndefined();
    expect(textItem.IsDeleted).toBeTruthy();

    const headlineItem = designerData.Items.find(element => element.Type == 'headline');
    expect(headlineItem).not.toBeUndefined();
    expect(headlineItem.IsDeleted).toBeFalsy();

    // Check if headline is centered and not floated and that the ID is the same as on import
    const headlineGeneralProperty = headlineItem.ContentItemProperties.find(element => element.Value.includes('general'));
    expect(headlineGeneralProperty).not.toBeUndefined();
    expect(headlineGeneralProperty.Id).toBe(233);
    expect(headlineGeneralProperty.Value).not.toBeUndefined();
    const headlineGeneralPropertyValue = JSON.parse(headlineGeneralProperty.Value);
    expect(headlineGeneralPropertyValue.float).toBe('none');
  });
});
